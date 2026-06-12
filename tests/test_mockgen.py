"""Tests for mock code generation."""

import pytest
from wire.schema import infer, merge
from wire.mockgen import generate


def test_generate_ts_interface():
    schema = infer({"id": 42, "name": "wire", "active": True, "tags": ["api", "diff"]})
    code = generate(schema, "test", "typescript")
    assert "export interface Root" in code
    assert "id: number" in code
    assert "name: string" in code
    assert "active: boolean" in code
    assert "tags:" in code


def test_generate_py_dataclass():
    schema = infer({"id": 1, "name": "wire", "active": True})
    code = generate(schema, "test", "python")
    assert "@dataclass" in code
    assert "class Root" in code
    assert "id_: int" in code
    assert "name: str" in code
    assert "active: bool" in code


def test_generate_rust_struct():
    schema = infer({"id": 1, "name": "wire", "active": True})
    code = generate(schema, "test", "rust")
    assert "pub struct Root" in code
    assert "pub id: i64" in code
    assert "pub name: String" in code
    assert "pub active: bool" in code
    assert '#[derive(Debug, Clone, Serialize, Deserialize)]' in code


def test_optional_in_ts():
    a = infer({"id": 1, "name": "a"})
    b = infer({"id": 2})
    merged = merge(a, b)
    code = generate(merged, "test", "typescript")
    assert "name?:" in code
