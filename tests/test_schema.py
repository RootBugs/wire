"""Tests for schema inference and merging."""

import json
import pytest
from wire.schema import infer, merge, infer_from_samples, Schema


def test_infer_simple_object():
    schema = infer({"id": 42, "name": "wire", "active": True})
    assert schema.type == "dict"
    assert schema.fields is not None
    assert schema.fields["id"].schema.type == "int"
    assert schema.fields["name"].schema.type == "str"
    assert schema.fields["active"].schema.type == "bool"


def test_infer_nested():
    schema = infer({"data": {"user": {"id": 1, "name": "a"}}})
    data_fields = schema.fields["data"].schema.fields
    assert data_fields is not None
    user_fields = data_fields["user"].schema.fields
    assert user_fields is not None
    assert user_fields["id"].schema.type == "int"
    assert user_fields["name"].schema.type == "str"


def test_infer_null():
    assert infer(None).type == "null"


def test_infer_array():
    schema = infer({"tags": ["a", "b", "c"]})
    assert schema.type == "dict"
    assert schema.fields["tags"].schema.type == "list"


def test_merge_makes_optional():
    a = infer({"id": 1, "name": "a"})
    b = infer({"id": 2, "email": "b@x.com"})
    merged = merge(a, b)
    assert merged.fields is not None
    assert merged.fields["name"].optional is True
    assert merged.fields["email"].optional is True
    assert merged.fields["id"].optional is False


def test_merge_type_mismatch_union():
    a = infer({"val": 42})
    b = infer({"val": "hello"})
    merged = merge(a, b)
    assert merged.fields is not None
    assert isinstance(merged.fields["val"].schema.type, list)


def test_infer_from_samples():
    samples = [
        {"id": 1, "name": "a", "extra": True},
        {"id": 2, "name": "b"},
        {"id": 3, "name": "c", "email": "c@x.com"},
    ]
    schema = infer_from_samples(samples)
    assert schema.fields is not None
    assert schema.fields["id"].optional is False
    assert schema.fields["name"].optional is False
    assert schema.fields["extra"].optional is True
    assert schema.fields["email"].optional is True


def test_serialization_roundtrip():
    schema = infer({"id": 42, "name": "wire", "tags": ["a", "b"]})
    d = schema.to_dict()
    restored = Schema.from_dict(d)
    assert restored.type == schema.type
    assert restored.fields is not None
    assert set(restored.fields.keys()) == set(schema.fields.keys())
