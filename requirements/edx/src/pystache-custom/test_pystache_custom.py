#!/usr/bin/env python
# coding: utf-8

"""
Runs project tests.

This script is a substitute for running--

    python -m pystache_custom.commands.test

It is useful in Python 2.4 because the -m flag does not accept subpackages
in Python 2.4:

  http://docs.python.org/using/cmdline.html#cmdoption-m

"""

import sys

from pystache_custom.commands import test
from pystache_custom.tests.main import FROM_SOURCE_OPTION


def main(sys_argv=sys.argv):
    sys.argv.insert(1, FROM_SOURCE_OPTION)
    test.main()


if __name__=='__main__':
    main()
