# coding: utf-8

"""
This module provides a command to test pystache_custom (unit tests, doctests, etc).

"""

import sys

from pystache_custom.tests.main import main as run_tests


def main(sys_argv=sys.argv):
    run_tests(sys_argv=sys_argv)


if __name__=='__main__':
    main()
