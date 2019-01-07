pragma solidity ^0.4.23;

contract CrytoBox {
    address private owner;
    uint8 private boxNum = 9;
    uint8 private currentNum = 0;
    mapping(uint8 => Goods) private boxRecord;

    struct Goods{
        uint8 used;
        address owner;
        bytes32 desc;
    }

    constructor() public{
        owner = msg.sender;
    }

    function getMyGoods() public view returns(uint8[] memory, bytes32[] memory){
        uint8[] memory indexList = new uint8[](boxNum);
        bytes32[] memory descList = new bytes32[](boxNum);

        for(uint8 i = 0; i < boxNum; i++){
            Goods storage g = boxRecord[i];
            if(g.used == 1 && g.owner == msg.sender){
                indexList[i] = i;
                descList[i] = g.desc;
            }
        }
        return (indexList, descList);
    }

    function getStatus() public view returns(bool[] memory){
        bool[] memory res = new bool[](boxNum);
        for(uint8 i = 0; i < boxNum; i++){
            Goods storage g = boxRecord[i];
            if(g.used == 1)
                res[i] = true;
            else
                res[i] = false;
        }
        return res;
    }

    function isFull() public view returns(bool){
        return currentNum == boxNum;
    }

    function addGoods(bytes32 goodsDesc) public{
        require(!isFull(), "Box is full!");
        Goods memory g = Goods(1, msg.sender, goodsDesc);
        for(uint8 i = 0; i < boxNum; i++){
            if(boxRecord[i].used == 0){
                boxRecord[i] = g;
                currentNum++;
                return;
            }
        }
    }

    function validId(uint8 id) private view returns(bool){
        return id >= 0 && id < boxNum;
    }

    function takeOut(uint8 id) public {
        require(validId(id), "Not valid id");
        Goods storage g = boxRecord[id];
        require(g.used == 1, "It's empty");
        require(g.owner == msg.sender, "You are not owner");
        g.used = 0;
        currentNum--;
    }
}