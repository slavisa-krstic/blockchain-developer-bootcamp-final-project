// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LuckyNumberToken is Context, AccessControl, ERC20 {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  constructor() ERC20("LuckyNumber", "LNT") {
    _mint(msg.sender, 100_000_000_000 * 10**18);
    _setupRole(MINTER_ROLE, msg.sender);
  }

  function mint(address _address, uint256 _amount) public {
    require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
    _mint(_address, _amount);
  }
}