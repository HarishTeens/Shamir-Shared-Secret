n=4, k=2

Creation

then generate n points with the above equation
distribute it

Retrieval
take two points, construct the line
find y intercept
that is the secret


STEPS
1. take the input secret
2. make them into bytes
For each byte
3. Generate a random number(a1)
4. build the equation // y = a0 +a1*x
5. generate 4 different points
6. convert back to ascii

7. take two of the shared secret
8. convert them into bytes
9. construct back the line using the two points
For each byte
10. find its y intercept, which is the secret
11. convert to char
12. stich them to string


The core logic of conveting y and embedding into a character
ex. y = 2x + 3;
x1 =1 ; y1= 5
x2 =2 ; y2= 7
Using a field of 4,
y1=> 1 ; y2=> 3

while reversing to find slope, doing
(y2-y1)%256/(x2-x1) would get the slope!!!
