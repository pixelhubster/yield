// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract FunctionsSource {
    string public getData = 
        "const getLandDetailsFromServer = await Functions.makeHttpRequest({"
        "url: `https://agricyield.vercel.app/api/land`,"
        "});"
        "return Functions.encodeString(getLandDetailsFromServer.data);";
}
