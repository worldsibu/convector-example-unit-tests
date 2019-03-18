# Bug Hunting demo project

This is a example project on how to debug and test a Convector Smart Contracts project.

Find the details in [this Medium post](https://medium.com/worldsibu/testing-and-debugging-a-convector-smart-contract-aa02c84e7ecc).

> Beware that this project uses [Convector 1.3.0](https://medium.com/worldsibu/convector-1-3-0-release-f4b9184e8ac8)

## Start

```bash
npm i
```

## Tests

```bash
npm t
```

## Details on the use case

The controller in this project has 3 main functions.

![Functions](images/fns.png?raw=true "Functions")

* `create`. This will create a dummy model in the ledger and set the `owner` to `this.sender` (a.k.a the wallet/certificate sending the request).
* `getOne`. This will just return one item by it's id.
* `update`. This will **try** to update the model but will first check that the requesting wallet/cert is the authorized (the one set in the `owner` property), if not, a `Ups, the requesting identity is not authorized to update the model` will be returned.

The test is fairly simple `./packages/mybuggychaincode-cc/tests/mybuggychaincode.spec.ts`:

* `should create a default model`. Create a dummy model.
* `should find the model`. Find it to check it the `create` function still works fine.
* `try to update without success`. Change the identity of the mock adapter and expect a rejection.
* `try to update with success`. Switch to the original certificate and expect a successful modification of data.

---

> Check all the information to work with Convector <a href="https://worldsibu.github.io/convector" target="_blank">in the DOCS site</a>.

## Collaborate to the Convector Suite projects

* <a href="https://discord.gg/twRwpWt" target="_blank">Discord chat with the community</a>
* <a href="https://github.com/worldsibu" target="_blank">Convector projects</a>
