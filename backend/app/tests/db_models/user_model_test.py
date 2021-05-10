import unittest
from ..test import db
from app.models import User, Plant
from app.schemas import New_user_payload
from app.curd import user
from sqlalchemy import exc

class Test_user_model(unittest.TestCase):
    def setUp(self):
        self.db = db

    def test_empty_first_name(self):
        new_user_data = {'first_name' : 'test', 'last_name' : 'tester', 'password' : 'test', 'username' : 'test', 'email' : 'test@test.com'}
        test = New_user_payload(**new_user_data)
        new_user = user.create_user(self.db, test)

