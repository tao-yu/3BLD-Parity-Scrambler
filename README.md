# 3BLD-Parity-Scrambler

https://tao-yu.github.io/3BLD-Parity-Scrambler/

This is a program that generates scrambles for the Rubik's Cube where the permutation of the corners (or edges) has a specified [parity](https://en.wikipedia.org/wiki/Parity_of_a_permutation). The following modes are available:

1. **Force Odd Parity**: This ensures that every scramble will have 3x3 blindfolded solving parity
2. **Indicate Parity**: This will add an indicator next to each scramble indicating whether the scramble has 3x3 blindfolded solving parity or not.
3. **Force Even Parity**: This ensures that every scramble will not have 3x3 blindfolded solving parity
4. **Corners Only, UFUR swap**: Corners will be scrambled, and there is a 50% chance that the UF and UR edges will be swapped (hence ensuring that the scramble has parity)
5. **Edges Only, URF-UBR swap**: Edges will be scrambled, and there is a 50% chance that the UFR and UBR corners will be swapped (hence ensuring that the scramble has parity)

Scrambles are random state.
