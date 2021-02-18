#!/bin/bash

if [ "$#" -eq 0 ]; then
  echo "Error: No solution specified." 1>&2
  exit 1
fi

if [ ! -d "exercises/$1" ]; then
  echo "Error: Exercise \"$1\" does not exist." 1>&2
  exit 1
fi

exercise_name="$1"
exercise_path="exercises/$exercise_name/"
solution_path="solutions/$exercise_name"

cp -Rp "$exercise_path" "$solution_path"
find "$solution_path" -type f -iname 'README.md' -exec rm {} \;
