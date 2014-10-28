# coding: utf-8

"""
Unit tests of commands.py.

"""

import sys
import unittest

from pystache_custom.commands.render import main


ORIGINAL_STDOUT = sys.stdout


class MockStdout(object):

    def __init__(self):
        self.output = ""

    def write(self, str):
        self.output += str


class CommandsTestCase(unittest.TestCase):

    def setUp(self):
        sys.stdout = MockStdout()

    def callScript(self, template, context):
        argv = ['pystache_custom', template, context]
        main(argv)
        return sys.stdout.output

    def testMainSimple(self):
        """
        Test a simple command-line case.

        """
        actual = self.callScript("Hi {{thing}}", '{"thing": "world"}')
        self.assertEqual(actual, u"Hi world\n")

    def tearDown(self):
        sys.stdout = ORIGINAL_STDOUT
