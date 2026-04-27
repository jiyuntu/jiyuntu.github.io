## Digital Signature
Signed by private key, verified by public key. For example, RSA has $f_{public}(f_{private}(signature)) = signature$. $f_{private}(signature)$ is hard to compute given $f_{public}$ and the signature. Note that the signature might not be a secret. A signature without signing is not valid.

## Encryption
Encrypted by public key, decrypted by private key. For example, RSA has $f_{private}(f_{public})(message) = message$. In this case, message is hard to compute given $f_{public}(message)$.

The requirement and process are not the same for both, so the algorithms are not necessarily shared.

## Digital Certificate
Digital Certificate is used to proof the validity of the *public key*. It is issued by a certificate authority.

## Applications
### (Taiwan) Citizen Digital Certificate
It is an ID card that stores the private key and returns the computed result. This doesn't sound like a digital certificate. 

### Others
HTTPS, financial transactions, etc.
