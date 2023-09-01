# Saline Academy 


## Docker
Pour lancer docker et construire les images. Si nul besoin de construire les images, retier le "--build"
```bash
docker compose -f docker-compose-dev.yml up -d --build
```
Pour supprimer les containers et les volumes. Si nul besoin de supprimer les volumes "-v"
```bash
docker compose -f docker-compose-dev.yml up down -v
```

## Script commandes helper
Un script est à la racine du projet, il permet de faciliter l'utilisation des commandes en tout genre.

Il faut rentrer cette commande pour pouvoir utiliser le script
```bash
chmod +x command-helper.sh
```
Pour avoir la liste des commandes disponible
```bash
./command-helper.sh
```