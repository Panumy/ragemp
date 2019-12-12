mp.events.add(
{
        "TaxiFareStart": passenger => {
        passenger.outputChatBox(`Fare has been started.`);
        }
});