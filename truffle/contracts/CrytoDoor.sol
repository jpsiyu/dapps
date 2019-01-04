pragma solidity ^0.4.23;

contract CrytoDoor{
    address private owner;
    address private keyHolder;
    uint private holdStartTime;
    uint private holdTime;

    constructor() public{
        owner = msg.sender;
    }

    function getPrice(uint useTime) private pure returns(uint){

        if(useTime == 120) return 100000000000000000;
        else if(useTime == 300) return 500000000000000000;
        else return 0;
    }

    function purchase(uint useTime) public payable{
        require(isHoldTimeFinish(), "Key is not free!");
        uint price = getPrice(useTime);
        require(0 != price, "Price not match!");
        require(msg.value == price, "Price not match!");
        keyHolder = msg.sender;
        holdStartTime = block.timestamp;
        holdTime = useTime;
    }

    function getKeyHolder() public view returns (address){
        if(isHoldTimeFinish()) 
            return address(0);
        else
            return keyHolder;
    }

    function isHoldTimeFinish() public view returns (bool){
        return getLeft() <= 0;
    }

    function getLeft() public view returns (int){
        if(keyHolder == address(0) || holdTime == 0 || holdStartTime == 0) 
            return 0;

        int left = int(holdStartTime + holdTime - block.timestamp);
        if (left < 0) return 0;
        return left;
    }

    function doorControll() public view returns (bool){
        if(keyHolder == msg.sender) return true;
        else return false;
    }

    function () external payable {

    }  
}