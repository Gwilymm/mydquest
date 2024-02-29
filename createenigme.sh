#!/bin/bash

# Définition de l'URL de l'API
API_URL="http://localhost:3000/api/enigmas/create"

# Déclaration des informations des énigmes
declare -a titles=( "L'Aube du Développeur" "Chuchotements du Web"  "Les Clés de la Normandie" "Le Miroir de Microsoft" "Le Mystère des Étages")
declare -a qrCodes=("3c5b2a1d8e6f7a9c" "1a2b3c4d5e6f7a8b" "9a8b7c6d5e4f3a2b" "c1b2a3d4e5f6a7b8" "7f8e9d0c1b2a3e4d")
declare -a descriptions=(
  "La première clé se trouve dans le langage des machines, où 'Hello World' est la lumière inaugurale."
  "Dans les profondeurs du site web de l'école se cache un commentaire oublié par les développeurs."
  "Un nombre mystérieux ouvre la porte de la salle secrète, égal au nombre de départements en Normandie multiplié par le nombre de lettres dans 'Caen'."
  "Le mot de passe de l'ordinateur du laboratoire est le prénom du fondateur de Microsoft à l'envers."
  "Pour retrouver l'algorithme perdu, résolvez cette équation : x = 3 * (nombre d'étages de l'école) + 5."
)
declare -a hints=(
  "Cherchez comment on accueille le monde dans le langage des serpents."
  "Inspectez la source à la recherche d'un commentaire laissé par un 'dev' curieux."
  "Combien y a-t-il de départements en Normandie ? Et de lettres dans 'Caen'?"
  "Qui a fondé Microsoft et quel est son prénom ?"
  "Combien d'étages compte My Digital School Caen ?"
)
declare -a solutions=("print('Hello World')" "<!-- MDS2024 -->" "20" "lliB" "14")

# Continuation des tableaux précédents avec les nouvelles énigmes
declare -a additionalTitles=("Cryptex Numérique" "Le Protocole Oublié" "Echo des Anciens" "Les Archives Secrètes")
declare -a additionalQrCodes=("2d3e4f5a6b7c8d9e" "8a9b7c6d5e3f2a1b" "b1c2d3e4f5a6b7c8" "e9f8a7b6c5d4e3f2")
declare -a additionalDescriptions=(
  "Un code dissimulé dans le nom de l'école ouvre le cryptex numérique."
  "Retrouvez le protocole ancien pour accéder au réseau secret de l'école."
  "Un ancien langage de programmation détient la clé de la prochaine énigme."
  "Dans les archives de l'école se trouve un livre ancien dont le titre est la clé."
)
declare -a additionalHints=(
  "Combinez les chiffres qui représentent les lettres de 'DIGITAL' selon leur position dans l'alphabet."
  "La réponse se trouve dans l'histoire d'Internet, inventé en quelle année?"
  "Le premier langage de haut niveau destiné à l'usage général. Son nom résonne encore."
  "Le titre du livre est le nom du scientifique qui a donné naissance à l'informatique moderne."
)
declare -a additionalSolutions=("62" "1969" "Fortran" "Turing")

# Fusion des tableaux
titles+=("${additionalTitles[@]}")
qrCodes+=("${additionalQrCodes[@]}")
descriptions+=("${additionalDescriptions[@]}")
hints+=("${additionalHints[@]}")
solutions+=("${additionalSolutions[@]}")

# Boucle pour créer chaque énigme
for i in "${!titles[@]}"; do
  curl -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "{
      \"title\": \"${titles[$i]}\",
      \"description\": \"${descriptions[$i]}\",
      \"hints\": \"${hints[$i]}\",
      \"solution\": \"${solutions[$i]}\",
      \"qrCode\": \"${qrCodes[$i]}\"
    }"
  echo "" # Pour la lisibilité dans le terminal
done
