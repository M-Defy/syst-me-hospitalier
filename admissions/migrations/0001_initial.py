import django.db.models.deletion
from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('patients', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Lit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.CharField(max_length=10, unique=True)),
                ('service', models.CharField(max_length=100)),
                ('statut', models.CharField(choices=[('LIBRE', 'Libre'), ('OCCUPE', 'Occupé')], default='LIBRE', max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Sejour',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_admission', models.DateTimeField(auto_now_add=True)),
                ('date_sortie', models.DateTimeField(blank=True, null=True)),
                ('statut', models.CharField(choices=[('EN_COURS', 'En cours'), ('TERMINE', 'Terminé'), ('ANNULE', 'Annulé')], default='EN_COURS', max_length=20)),
                ('lit', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='admissions.lit')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sejours', to='patients.patient')),
            ],
        ),
    ]
