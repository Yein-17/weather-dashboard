import pytest
from app import app
import os
from unittest.mock import patch

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_weather_endpoint(client):
    response = client.get('/weather?city=London')
    assert response.status_code == 200
    assert b'temp' in response.data

def test_missing_city_param(client):
    response = client.get('/weather')
    assert response.status_code == 400
    assert b'Missing city or API key' in response.data

def test_invalid_city(client):
    response = client.get('/weather?city=NotARealCity')
    assert response.status_code == 404
    assert b'City not found' in response.data

def test_invalid_api_key(client, monkeypatch):
    monkeypatch.setenv('WEATHER_API_KEY', 'invalid_key')
    response = client.get('/weather?city=London')
    assert response.status_code in (401, 404)

def test_openweather_failure(client):
    with patch('app.requests.get') as mock_get:
        mock_get.side_effect = Exception("Network error")
        response = client.get('/weather?city=London')
        assert response.status_code == 500
        assert b'Something went wrong' in response.data

