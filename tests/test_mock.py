"""Tests for mock generation."""

import pytest
from wire.schema import infer, merge
from wire.mockgen import generate


class TestTypeScript:
    def test_interface(self):
        schema = infer({"id": 42, "name": "wire", "active": True, "tags": ["api"]})
        code = generate(schema, "test", "ts")
        assert "export interface Root" in code
        assert "id: number" in code
        assert "name: string" in code
        assert "active: boolean" in code
        assert "tags: string[]" in code


class TestPython:
    def test_dataclass(self):
        schema = infer({"id": 1, "name": "wire", "active": True})
        code = generate(schema, "test", "py")
        assert "@dataclass" in code
        assert "class Root:" in code
        assert "id_: int" in code
        assert "name: str" in code


class TestRust:
    def test_struct(self):
        schema = infer({"id": 1, "name": "wire", "active": True})
        code = generate(schema, "test", "rust")
        assert "pub struct Root" in code
        assert "pub id: i64" in code
        assert "pub name: String" in code
        assert "#[derive(Debug, Clone, Serialize, Deserialize)]" in code


class TestOptional:
    def test_ts_optional(self):
        a = infer({"id": 1, "name": "a"})
        b = infer({"id": 2})
        merged = merge(a, b)
        code = generate(merged, "test", "ts")
        assert "name?:" in code
