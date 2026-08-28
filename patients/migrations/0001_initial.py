from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=100)),
                ('prenom', models.CharField(max_length=100)),
                ('date_naissance', models.DateField()),
                ('sexe', models.CharField(choices=[('M', 'Masculin'), ('F', 'Féminin'), ('AUTRE', 'Autre')], default='M', max_length=10)),
                ('adresse', models.TextField(blank=True)),
                ('contact_urgence', models.CharField(blank=True, max_length=100)),
            ],
        ),
    ]
