"""Script to Run localhost Web Server for Development and Debugging

References:
    - ...
"""

import argparse
import logging
import atexit
import sys

from tommypkeane_dev_tools.html_server import run_localhost_server


module_logger = logging.getLogger(__name__)


@atexit.register
def exit_func() -> None:
    """Run Exit Logic at natural end of Interpreter Runtime

    Note that this will not run if `CTRL+C` is pressed, because that is aligned to a
    system interrupt signal that will immediately exit sequentially out of all nested
    scopes during runtime, so the Python `logging` also gets interrupted and only
    `print()` statements would work.

    Returns:
        None: Nothing is returned, this is the end of the Python runtime
    """
    module_logger.info("🏁 Done!")
    module_logger.info("👋 Goodbye!")
    return None


if __name__ == "__main__":
    cli_parser_obj = argparse.ArgumentParser(
        description="Local Webserver Runtime for Development and Debugging",
    )

    cli_parser_obj.add_argument(
        "-p",
        "--port",
        type=int,
        default=8080,
        help=(
            "Local Port to bind the Webserver to. If runtime errors out, the port is"
            " already in use, so another value should be chosen. Typically you can use"
            " values like 8000, 8001, 8080, 8888, 9000, 9001, and so on. On Unix"
            " systems (including macOS) use `netstat -anp tcp | grep LISTEN` to find"
            " which ports are in use."
        ),
    )

    cli_args = cli_parser_obj.parse_args()

    host_port: int = cli_args.port

    module_logger.info(
        "Starting Local Server at localhost:%(host_port)s",
        host_port,
    )

    try:
        run_localhost_server(port=host_port)
    except (KeyboardInterrupt, SystemExit):
        pass
