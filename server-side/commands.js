mp.events.addCommand('gibztaxi', (player) => {
    mp.vehicles.new(mp.joaat("taxi"), player.position,
        {
            numberPlate: "ADMIN",
            color: [[88, 88, 88], [88, 88, 88]]
        });
});

mp.events.addCommand('setfare', (player, fare) => {
    if (!player.vehicle) return player.outputChatBox(`You must be in a vehicle.`);
    if (player.vehicle.model != mp.joaat('taxi')) return player.outputChatBox(`You must be in a taxi.`);
    player.outputChatBox(`Set the fare to $${fare} per mile.`);
    player.vehicle.setVariable('fareprice', fare);
});

mp.events.addCommand('acceptfare', (player) => {
    if (player.vehicle.model != mp.joaat('taxi')) return player.outputChatBox(`You must be in a taxi.`);

    let driver = player.vehicle.getOccupant(-1);

    mp.events.call("TaxiFareStart", driver, player);
});

mp.events.addCommand('stopmeter', (player) => {
    // You must be a taxi driver checker here
    if (player.vehicle.model != mp.joaat('taxi')) return player.outputChatBox(`You must be in a taxi.`);

    mp.events.call("TaxiFareStop", player);
});

// Debug
mp.events.addCommand('adddistance', (player) => {
    var distance = player.vehicle.getVariable('distancefromfarestart') + 0.4;
    distance = Math.round(distance * 100) / 100; // Round up to two decimals
    player.vehicle.setVariable('distancefromfarestart', distance);

    player.outputChatBox(`DEBUG: The distance is now ${distance}`);
});
