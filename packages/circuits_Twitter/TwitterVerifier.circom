pragma circom 2.1.5;

include "@zk-email/circuits/email-verifier.circom";
include "./TwitterResetRegex.circom";


// For twitter we use the following inputs
// max_header_bytes = 1024 - This is the maximum number of bytes in the header.
// max_body_bytes = 1536 - This is the maximum number of bytes in the body after the precomputed slice.
// n = 121 - This is the number of bits in each chunk of the pubkey (RSA parameter).
// k = 17 - This is the number of chunks in the pubkey (RSA parameter). Note that 121 * 17 > 2048.
// pack_size = 31 - This is the number of bytes that can fit into a 255ish bit signal (can increase later).

template TwitterVerifier(max_header_bytes, max_body_bytes, n, k, pack_size) {


    var max_twitter_len = 21;
    var max_twitter_packed_bytes = count_packed(max_twitter_len, pack_size);

    // @inputs
    // in_padded[max_header_bytes] - Prehashed email data.
    // pubkey[k] - RSA public key.
    // signature[k] - RSA signature.
    // in_len_padded_bytes - Length of the email, including padding.
    // address - Wallet address.
    // body_hash_idx - Index of the body hash.
    // twitter_username_idx - Index of twitter username.

    signal input in_padded[max_header_bytes];
    signal input pubkey[k];
    signal input signature[k];
    signal input in_len_padded_bytes;
    signal input address;
    signal input body_hash_idx;
    signal input precomputed_sha[32];
    signal input in_body_padded[max_body_bytes];
    signal input in_body_len_padded_bytes;
    signal input twitter_username_idx;
    signal output pubkey_hash;
    signal output reveal_twitter_packed[max_twitter_packed_bytes];

    component EV = EmailVerifier(max_header_bytes, max_body_bytes, n, k, 0);
    EV.in_padded <== in_padded;
    EV.pubkey <== pubkey;
    EV.signature <== signature;
    EV.in_len_padded_bytes <== in_len_padded_bytes;
    EV.body_hash_idx <== body_hash_idx;
    EV.precomputed_sha <== precomputed_sha;
    EV.in_body_padded <== in_body_padded;
    EV.in_body_len_padded_bytes <== in_body_len_padded_bytes;
    pubkey_hash <== EV.pubkey_hash;

    // // SUBJECT HEADER REGEX
    // signal subject_regex_out, subject_regex_reveal[max_header_bytes];
    // (subject_regex_out, subject_regex_reveal) <== SubjectAllRegex(max_header_bytes)(in_padded);
    // subject_regex_out === 1;
    // signal subject_all[max_subject_bytes];
    // subject_all <== VarShiftMaskedStr(max_header_bytes, max_subject_bytes)(subject_regex_reveal, subject_idx);
    // hsubject <== Bytes2Ints(max_subject_bytes)(subject_all);

    // // DOMAIN NAME HEADER REGEX
    // signal domain_regex_out, domain_regex_reveal[email_max_bytes];
    // (domain_regex_out, domain_regex_reveal) <== EmailDomainRegex(email_max_bytes)(sender_email_addr);
    // domain_regex_out === 1;
    // signal domain_name_bytes[domain_len];
    // domain_name_bytes <== VarShiftMaskedStr(email_max_bytes, domain_len)(domain_regex_reveal, domain_idx);
    // domain_name <== Bytes2Ints(domain_len)(domain_name_bytes);

    // // Timestamp regex + convert to decimal format
    // signal timestamp_regex_out, timestamp_regex_reveal[max_header_bytes];
    // (timestamp_regex_out, timestamp_regex_reveal) <== TimestampRegex(max_header_bytes)(in_padded);
    // timestamp_regex_out === 1;
    // signal timestamp_str[timestamp_len];
    // timestamp_str <== VarShiftMaskedStr(max_header_bytes, timestamp_len)(timestamp_regex_reveal, timestamp_idx);
    // timestamp <== Digit2Int(timestamp_len)(timestamp_str);


    signal (twitter_regex_out, twitter_regex_reveal[max_body_bytes]) <== TwitterResetRegex(max_body_bytes)(in_body_padded);
    
    // component twitterRegex = TwitterResetRegex(max_body_bytes);
    // twitterRegex.in_body_padded <== in_body_padded; // Assuming the input signal to TwitterResetRegex is named 'in_body_padded'

    // signal twitter_regex_out;
    // signal twitter_regex_reveal[max_body_bytes];

    // twitter_regex_out <== twitterRegex.out1; // Assuming the first output is named 'out1'
    // // Then you would assign each element of the output array individually
    // for (var i = 0; i < max_body_bytes; i++) {
    //     twitter_regex_reveal[i] <== twitterRegex.out2[i]; // Assuming the second output is an array named 'out2'
    // }
    
    signal is_found_twitter <== IsZero()(twitter_regex_out);

    // component isZeroComp = IsZero();
    // isZeroComp.in <== twitter_regex_out; // Assuming 'in' is the input signal name for IsZero
    // signal is_found_twitter;
    // is_found_twitter <== isZeroComp.out; // Assuming 'out' is the output signal name for IsZero
    // is_found_twitter === 0;

    reveal_twitter_packed <== ShiftAndPackMaskedStr(max_body_bytes, max_twitter_len, pack_size)(twitter_regex_reveal, twitter_username_idx);

    // component shiftAndPack = ShiftAndPackMaskedStr(max_body_bytes, max_twitter_len, pack_size);
    // shiftAndPack.twitter_regex_reveal <== twitter_regex_reveal;
    // shiftAndPack.twitter_username_idx <== twitter_username_idx; // Adjust these input names as necessary
    // signal reveal_twitter_packed[max_twitter_packed_bytes]; // Ensure this signal is properly sized
    // reveal_twitter_packed <== shiftAndPack.out; // Assuming 'out' is the output signal name

}

component main  = TwitterVerifier(1024, 1536, 121, 17, 31);
