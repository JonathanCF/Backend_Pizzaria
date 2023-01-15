import prismaClient from "../../prisma";

interface OrderRequeste{
	order_id: string
}

class RemoveOrderService {
	async execute({order_id}: OrderRequeste){

		const order = prismaClient.order.delete({
			where: {
				id: order_id
			}
		})
			return order
	}
}

export { RemoveOrderService}