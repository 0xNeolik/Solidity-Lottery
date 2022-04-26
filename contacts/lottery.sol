// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Lottery{
    address public manager;
    address[] public players;

    constructor(address memory manager){
        manager = msg.sender;
    }

    function enter() public payable{
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    function random() private view returns(uint){
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
    }
}