"""Tests for schema diffing."""

import pytest
from wire.schema import infer
from wire.diff import diff_schemas


def test_no_change():
    s = infer({"id": 1, "name": "wire"})
    diff = diff_schemas(s, s, "root")
    assert len(diff.changes) == 0
    assert diff.summary.total == 0


def test_removed_field_breaking():
    old = infer({"id": 1, "name": "wire", "extra": True})
    new = infer({"id": 1, "name": "wire"})
    diff = diff_schemas(old, new, "root")
    assert diff.summary.breaking > 0
    assert diff.summary.removed_fields == 1
    assert diff.changes[0].kind == "Removed"


def test_added_field_non_breaking():
    old = infer({"id": 1})
    new = infer({"id": 1, "email": "a@b.com"})
    diff = diff_schemas(old, new, "root")
    assert diff.summary.breaking == 0
    assert diff.summary.added_fields == 1
    assert diff.changes[0].kind == "Added"


def test_type_change_breaking():
    old = infer({"id": 42})
    new = infer({"id": "forty-two"})
    diff = diff_schemas(old, new, "root")
    assert diff.summary.type_changes == 1
    assert diff.summary.breaking > 0


def test_nested_diff():
    old = infer({"data": {"user": {"id": 1, "name": "a"}}})
    new = infer({"data": {"user": {"id": "1"}}})
    diff = diff_schemas(old, new, "root")
    assert diff.summary.breaking > 0
    assert any("data.user" in c.path for c in diff.changes)
