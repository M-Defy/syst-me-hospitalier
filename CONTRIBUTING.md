# Guide de contribution — Règles de l'équipe

## Workflow Git

1. **Jamais de push direct sur `main`.** La branche `main` est protégée : tout passe par une Pull Request (PR).
2. Pour chaque tâche (Issue GitHub), créer une branche depuis `main` :
git checkout main
git pull
git checkout -b feature/<id-tache>-<description-courte>
Exemple : `feature/2.1-api-crud-patient`

3. Committer régulièrement, avec des messages clairs :
git commit -m "feat(patient): ajoute l'endpoint de création de patient"
Préfixes recommandés : `feat` (fonctionnalité), `fix` (correction), `docs` (documentation), `test` (tests), `chore` (config/outillage).

4. Pousser la branche et ouvrir une Pull Request vers `main`, en liant l'Issue correspondante (`Closes #12`).

5. **Au moins une revue (review) d'un autre membre est requise avant de fusionner.** Ne pas fusionner sa propre PR sans relecture.

6. Une fois la PR fusionnée, supprimer la branche.

## Convention IA (obligatoire)

Toute Pull Request dont le code a été généré ou assisté par IA doit inclure dans sa description :
- Un résumé de la logique métier en langage humain (pas juste "ajout du module X")
- Une mention explicite : `Assisté par IA : [oui/non]`

## Attribution des tâches

Chaque tâche du WBS correspond à une Issue GitHub, assignée nommément et rattachée à un Milestone (voir `docs/wbs_issues.csv`).
