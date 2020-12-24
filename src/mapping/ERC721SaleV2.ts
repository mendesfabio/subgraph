import { Buy } from "../../generated/ERC721SaleV2/ERC721SaleV2"
import { Address, BigInt } from "@graphprotocol/graph-ts/index"
import { initDeal } from '../factory'
import { calculatePriceAndFee, fillServiceFields } from '../utils'
import { ContractAddress, ContractName } from "../enum"

export function handleBuy(event: Buy): void {
    let deal = initDeal(event, ContractName.ERC_721_SALE_V2)
    deal.seller = event.params.seller
    deal.buyer = event.params.buyer
    deal.sellToken = event.params.token
    deal.buyToken = Address.fromString(ContractAddress.WETH9)
    deal.sellAmount = BigInt.fromI32(1)
    deal.buyAmount = event.params.price
    calculatePriceAndFee(deal)
    fillServiceFields(deal, event)
    deal.save()
}
