# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-06 09:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0002_review_user_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='user_pic',
            field=models.URLField(default='https://avatars0.githubusercontent.com/u/26462528?v=4'),
        ),
    ]
