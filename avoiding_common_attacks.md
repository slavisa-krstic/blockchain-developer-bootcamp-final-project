# Contract security measures

## SWC-100 (Function Default Visibility)
All functions have visibility operator set, no default operators.

## SWC-103 (Floating pragma)

Specific compiler pragma `0.8.0` used in contracts to avoid accidental bug inclusion through outdated compiler versions.

## SWC-105 (Unprotected Ether Withdrawal)

`createGuessingNumberGame` is protected with OpenZeppelin `Ownable`'s `onlyOwner` modifier.

## SWC-104 (Unchecked Call Return Value)

The return value from a call is checked with `require` to ensure transaction rollback if call fails.

## SWC-115 (Tx.Origin Authentication)

`msg.sender` is used in all modifiers to validate transaction sender permissions and flow of the contract.

## SWC-119 (Shadowing State Variables)

All contract functions is checked to use proper names for variables

## Modifiers used only for validation

All modifiers in contract(s) only validate data with `require` statements.

## Pull over push

All functions that modify state are based on receiving calls rather than making contract calls.