# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-06 09:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='user_pic',
            field=models.URLField(null=True),
        ),
    ]
