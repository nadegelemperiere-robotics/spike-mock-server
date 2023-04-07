""" Tests configuration """

# Pytest includes
from pytest import fixture


def pytest_addoption(parser):
    """ Options definition """
    parser.addoption(
        "--url", action="store", default="0.0.0.0:8888", help="server url: (default : 0.0.0.0:8888)"
    )

@fixture
def urlopt(request):
    """ To retrieve url option """
    return request.config.getoption("--url")
