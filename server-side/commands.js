// Debug command to spawn a taxi and test the script
/*mp.events.addCommand('gibztaxi', (player) => {
    mp.vehicles.new(mp.joaat("taxi"), player.position,
        {
            numberPlate: "ADMIN",
            color: [[88, 88, 88], [88, 88, 88]]
        });
});

mp.events.addCommand('killtaxi', (player) => {
    player.vehicle.explode();
});*/
// -------------------------------------------------

// Allowing taxi drivers to set their own fare per mile
mp.events.addCommand('setfare', (player, fare) => {
    if (fare == undefined) return SyntaxErrorMessage(player,`/setfare (fare price)`); // Checks if the driver actually put a number in
    if (isNaN(fare)) return SyntaxErrorMessage(player,`The fare price has to be a number.`); // Checks if the fare price is a number or not
    if (fare < 0.1) return ErrorMessage(player, "You can't set the fare per mile lower than $0.1."); // Checks if the fare is lower than 0.1
    if (!player.vehicle) return ErrorMessage(player, "You must be in a vehicle."); // Checks if the taxi driver is in the vehicle
    if (player.vehicle.model != mp.joaat('taxi')) return ErrorMessage(player, "You must be in a taxi."); // Checks if the taxi driver is in an actual taxi
    if (player != player.vehicle.getOccupant(-1)) return ErrorMessage(player, "You must be in the drivers seat to use this command."); // Checks if the taxi driver is in the drivers seat
    
    player.outputChatBox(`Set the fare to <b style='color: green'>$${fare}</b> per mile.`); // Prints out to the driver the fare he set for the taxi
    
    player.vehicle.setVariable('fareprice', fare); // Saves the set fare price for the vehicle
    player.vehicle.setVariable('distancefromfarestart', 0); // Sets the distance to 0
});

// Command that is meant for the passenger when they enter the vehicle
mp.events.addCommand('acceptfare', (player) => {
    if (!player.vehicle) return ErrorMessage(player, "You must be in a vehicle."); // Checks if the taxi driver is in the vehicle
    if (player.vehicle.model != mp.joaat('taxi')) return ErrorMessage(player, "You must be in a taxi.");  // Checks if the player is inside an actual taxi
    if (player == player.vehicle.getOccupant(-1)) return player.outputChatBox(`You can't accept your own fare.`); // Checks if the player is in the drivers seat
    //                      ^^^ Comment this check when testing the code ^^^
    if (player.vehicle.getVariable('fareprice') == null) return ErrorMessage(player, "The fare price has not been set for the taxi,"); // Checks if the fare is existant
    if (player.vehicle.getVariable('distancefromfarestart') != 0) return ErrorMessage(player, "The taxi meter is already active."); // Checks if the taxi meter is already active
    let driver = player.vehicle.getOccupant(-1); // Gets the driver ID of the taxi

    mp.events.call("TaxiFareStart", driver, player); // Starts the taxi timer
});

mp.events.addCommand('stopmeter', (player) => {
    if (!player.vehicle) return ErrorMessage(player, "You must be in a vehicle."); // Checks if the taxi driver is in the vehicle
    if (player.vehicle.model != mp.joaat('taxi')) return ErrorMessage(player, "You must be in a taxi."); // Checks if the player is inside an actual taxi
    if (player.vehicle.getOccupant(-1) != player) return ErrorMessage(player, "Only the taxi driver can do this."); // Checks if the player is the driver of the taxi
    if (player.vehicle.getVariable('distancefromfarestart') == 0) return ErrorMessage(player, "The taxi meter is not active."); // Checks if the taxi meter is active

    mp.events.call("TaxiFareStop", player, player.vehicle); // Stops the taxi timer
});

function ErrorMessage(player, msg)
{
        player.outputChatBox(`<b style='color: red'>[Error]:</b> ${msg}`);
}

function SyntaxErrorMessage(player, msg)
{
        player.outputChatBox(`<b style='color: red'>[Syntax Error]:</b> ${msg}`);
}
