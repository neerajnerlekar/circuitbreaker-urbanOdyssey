## This command compiles the circuit to get a system of arithmetic equations representing it. 
## Using this we will also obtain programs to compute the witness. 
echo "\n\n-----------------------Compiling circom circuit---------------------\n"

circom -l node_modules TwitterVerifier.circom -o --r1cs --wasm --sym --c

# --r1cs:
## The --r1cs contains the Rank-1 Constraint System (R1CS) in binary format. 
## With circom, we design our own circuits with our own constraints, and the compiler 
## outputs the R1CS representation that will be needed for your zero-knowledge proof.

# --wasm:
## Generates a directory [name]_js where the .wasm file lives. 
## These files are used to generate the witness, i.e., the set of signals that satisfy the circuit.

# --sym:
## Generates the file [name].sym. 
## These symbols file are used to debugging/printing the constraint system in an annotated mode.

# --c:
## Generates the directory [name]_cpp. 
## Contains the equivalent of the wasm directory used to generate the witness of the circuit.

cd TwitterVerifier_js/

## Computing the witness with WebAssembly
### For this we need to generate a witness: a set of signals that satisfy the circuit. 
### We'll need an inputs JSON file that contains all the circuit's inputs.

# Logic/programmatic logic files: generate_witness.js, merkle.wasm 
# Input file: input.json
# Output file: witness.wtns
## The two programs will generate the same ẁitness.wtns file. 
## This file is encoded in a binary format compatible with snarkjs, 
## which is the tool that we use to create the actual proofs. 

node generate_witness.js TwitterVerifier.wasm ../input.json witness.wtns

cd ..

## We will use Groth16 here. It is a zk-SNARK protocol. 
## To use it, one needs to generate a trusted setup.
## As per the paper by cryptographic researchers, we need a common source of entropy to generate the proof.
## The trusted setup generation is equivalent to some ceremony where people agree to some source of randomness.
## It is considered a potential point of failure as any actor 
## should not know the seed to the randomness used by all participants 
## (unlikely in the real world, but important to know). 

# Phase 1 of the trusted setup generation is called the "Powers of Tau".
# It is independent of the circuit itself. 
# Note that one should choose a power of tau high enough to run phase 2,
# otherwise will get an error of the from "X > 2^n".
echo "<===============Phase-1==================>\n \n"
echo "-----Creating the tau ceremony------\n \n"
snarkjs powersoftau beacon pot12_0001.ptau pot12_beacon.ptau 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n='Final Beacon'

echo "-------Making the first contribution tau ceremony-----\n\n"
snarkjs powersoftau prepare phase2 pot12_beacon.ptau pot12_final.ptau -v

# Phase 2 is circuit-specific and is used to generate a .zkey file.
# This file contains proving and verification keys.

echo "<===============Phase-2==================>\n \n"
snarkjs zkey new pot12_final.ptau twitter.wasm twitter_0000.zkey
snarkjs zkey contribute twitter_0000.zkey twitter_0001.zkey --name='1st Contributor Name' -v

echo "-------Making the contribution tau ceremony Phase-2-----\n\n"
snarkjs zkey beacon twitter_0001.zkey twitter_final.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n='Final Beacon'
snarkjs zkey export verificationkey twitter_final.zkey

cp TwitterVerifier_js/witness.wtns .

# Once the witness is computed and the trusted setup is already executed,
# we can generate a zk-proof associated to the circuit and the witness

# echo "<===============Generating Proof==================>\n \n"
# snarkjs groth16 prove LocationProof_0001.zkey witness.wtns proof.json public.json

# echo "<===============Verifying Proof==================>\n \n"
# snarkjs groth16 verify verification_key.json public.json proof.json

# # for generating a smart contract to verify the proof
# echo "<===============Generating Smart Contract==================>\n \n"
# snarkjs zkey export solidityverifier LocationProof_0001.zkey verifier.sol
# echo "<===============Smart Contract Generated==================>\n \n"

# # for generating valid params to verify through smart Contract
# echo "<===============Generating Parameters==================>\n \n"
# snarkjs generatecall
# echo "<===============Parameters Generated==================>\n \n"