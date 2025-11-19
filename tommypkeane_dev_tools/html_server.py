"""HTML Server Utilities

References:
    - https://gist.github.com/jwhb/de4225afba72328af443671177666ec5
    - https://stackoverflow.com/questions/31251524/python-simplehttpserver-change-service-directory
    - https://discuss.python.org/t/keyboardinterrupt-and-systemexit-in-exception-groups-should-be-considered-for-pythons-exit-code/82816/9
"""

import http
import http.server
import logging
import pathlib
import socketserver
import typing


module_logger = logging.getLogger(__name__)

package_dir = pathlib.Path(__file__).parent
site_dir = package_dir.parent / "site/"


class SiteServerHandler(http.server.SimpleHTTPRequestHandler):
    """Override base Class for Basic HTTP Request Handling

    Note that the `__init__` is overridden as a way to customize the root `/` directory
    location for the webserver, which helps mimic the GitHub Pages hosting more directly
    so that this dev server should basically fully mimic the GitHub Pages deployment.

    Methods that can be overridden:
        - `do_GET()`
        - `do_POST()`
        - ...
    """

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(
            *args,
            directory=site_dir,
            **kwargs,
        )
        return None

    def do_GET(self) -> None:
        module_logger.debug(self.headers)
        http.server.SimpleHTTPRequestHandler.do_GET(self)
        return None


def localhost_socketserver(
    addr: str = "localhost",
    port: int = 8080,
    request_handler_obj: typing.Callable = SiteServerHandler,
) -> object:
    """Provide a customized TCP Server for localhost Web Hosting and Debugging

    Args:
        addr (str, optional): IPv4 Address for the webserver, defaults to `localhost`
            which allows you to use `http://localhost` or `http://127.0.0.1`
        port (int, optional): Alternative port number to use for web hosting of the
            server. HTTP is typically on port `80`, so for this debug server we default
            to a value `8080` as a common convention.
        request_handler_obj (typing.Callable, optional): Class of the Request Handler
            instance, which is instantiated for the scoker server and is then passed
            every request sent to the local server via the given `http://{addr}:{port}`
            URL
    """
    server_obj = socketserver.TCPServer((addr, port), request_handler_obj)
    return server_obj


def run_localhost_server(port: int = 8080) -> None:
    """Start and run-forever (until interrupted) with a localhost server for WebDev

    Args:
        port (int, optional): Port number to use for binding the server to, to `LISTEN`

    Returns:
        None: Nothing is returned, the server is instantiated and runs forever until
            the Python interpreter is interrupted, the process is killed, or the runtime
            causes an uncaught exception.
    """
    with localhost_socketserver(port=port) as server_obj:
        module_logger.warning("⚠️ Use `CTRL+C` to stop the server...")
        server_obj.serve_forever()

    return None
