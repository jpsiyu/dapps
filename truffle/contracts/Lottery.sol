pragma solidity ^0.4.23;

contract Lottery {
    struct Round {
        uint endBlock;
        uint drawBlock;
        Entry[] entries;
        uint totalQuantity;
        address winner;
    }

    struct Entry {
        address buyer;
        uint quantity;
    }

    uint constant private TicketPrice = 1e17;
    mapping(uint => Round) private rounds;
    uint private round;
    uint private duration = 10;
    mapping (address => uint) private balances;

    constructor() public {
        round = 1;
        rounds[round].endBlock = block.number + duration;
        rounds[round].drawBlock = block.number + duration + 5;
    }

    /** getter */
    function getTicketPrice() public pure returns(uint){
        return TicketPrice;
    }

    function getRound() public view returns (uint){
        return round;
    }

    function getRoundInfo (uint _round) public view returns (uint, address) {
        Round storage r = rounds[_round];
        return (r.totalQuantity, r.winner);
    }

    function getAllRoundInfo () public view returns(uint, uint[] memory, address[] memory, int[] memory){
        uint[] memory quantityArray = new uint[](round);
        address[] memory winnerArray = new address[](round);
        int[] memory diff = new int[](round);

        for(uint i = 0; i < round; i++){
            Round storage r = rounds[i+1];
            quantityArray[i] = r.totalQuantity;
            winnerArray[i] = r.winner;
            diff[i] = int(r.drawBlock - block.number + 1);
        }
        return (round, quantityArray, winnerArray, diff);
    }
    
    function getBalance() public view returns(uint256) {
        return balances[msg.sender];
    }

    /** logic */
    function buy() public payable{
        require(msg.value % TicketPrice == 0, "Value must be integer multiples of TicketPrice");
        if(block.number > rounds[round].endBlock){
            round += 1;
            rounds[round].endBlock = block.number + duration;
            rounds[round].drawBlock = block.number + duration + 5;
        }
        uint quantity = msg.value / TicketPrice;
        Entry memory entry = Entry(msg.sender, quantity);
        rounds[round].entries.push(entry);
        rounds[round].totalQuantity += quantity;
    }

    function drawWinner(uint roundNumber) public{
        Round storage drawing = rounds[roundNumber];
        require(drawing.winner == address(0), "Winner has been drawed");
        require(block.number > drawing.drawBlock, "Draw block not reach");
        require(drawing.entries.length > 0, "No entry at all");

        bytes32 rand = keccak256(abi.encode(blockhash(drawing.drawBlock)));

        uint counter = uint(rand) % drawing.totalQuantity;
        for(uint i = 0; i < drawing.entries.length; i++){
            uint quantity = drawing.entries[i].quantity;
            if(quantity > counter){
                drawing.winner = drawing.entries[i].buyer;
                break;
            }else{
                counter -= quantity;
            }
        }
        balances[drawing.winner] = TicketPrice * drawing.totalQuantity;
    }

    function withdraw() public{
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(amount);
    }

    function deleteRound(uint _round) public{
        require(block.number > rounds[_round].drawBlock+100, "Not now!");
        require(rounds[_round].winner != address(0), "Not draw");
        delete rounds[_round];
    }


    function () external payable {
        buy();
    }
}