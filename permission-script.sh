#!/bin/bash

for script in ./*.sh
do
  if [ -f "$script" ]; then
    chmod +x "$script"
    echo "Le script $script est maintenant exécutable."
  fi
done

echo "Tous les scripts sont maintenant exécutables."
