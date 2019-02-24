pragma solidity ^0.4.23;

contract SimplePonzi{
    address[] public investors;
    mapping(address => uint) public balances;
    uint public constant MinimumInvestment = 1e17;

    constructor () public{
        investors.push(msg.sender);
    }

    function getMinimumInvestment() public pure returns(uint) {
        return MinimumInvestment;
    }

    function () external payable {
        require(msg.value >= MinimumInvestment, "Investment not enough");
        uint share = msg.value / investors.length;
        for(uint i = 0; i < investors.length; i++){
            balances[investors[i]] += share;
        }
        if(balances[msg.sender] == 0)
            investors.push(msg.sender);
    }

    function withdraw () public {
        uint payout = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(payout);
    }

    function getBalance () public view returns(uint) {
        return balances[msg.sender];
    }
}