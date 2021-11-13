import PlaceAccountInput from "../../src/account/aplication/dto/PlaceAccountInput";

test("Deve registrar uma conta", async function () {
  const input = new PlaceAccountInput("Zezinho Legal", "123.961.857-30", "28999466070", "Rua legal");
  //const output = await PlaceAccount.execute(input);
  //expect(output.code > 0).toBeTruthy();
})