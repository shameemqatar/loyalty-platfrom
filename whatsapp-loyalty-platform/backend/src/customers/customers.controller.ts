import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Patch,
} from '@nestjs/common';

import { CustomersService } from './customers.service.js';
import { CreateCustomerDto } from './create-customer.dto.js';
import { UpdateCustomerDto } from './update-customer.dto.js';

@Controller('businesses/:businessId/customers')
export class CustomersController {
    constructor(
        private readonly customersService: CustomersService,
    ) { }

    @Post()
    create(
        @Param('businessId', ParseIntPipe) businessId: number,
        @Body() createCustomerDto: CreateCustomerDto,
    ) {
        return this.customersService.create(
            businessId,
            createCustomerDto,
        );
    }
    @Get()
    findAll(
        @Param('businessId', ParseIntPipe) businessId: number,
    ) {
        return this.customersService.findAll(businessId);
    }

    @Get(':customerId')
    findOne(
        @Param('businessId', ParseIntPipe) businessId: number,

        @Param('customerId', ParseIntPipe) customerId: number,
    ) {
        return this.customersService.findOne(
            businessId,
            customerId,
        );
    }

    @Patch(':customerId')
    update(
        @Param('businessId', ParseIntPipe) businessId: number,

        @Param('customerId', ParseIntPipe) customerId: number,

        @Body() updateCustomerDto: UpdateCustomerDto,
    ) {
        return this.customersService.update(
            businessId,
            customerId,
            updateCustomerDto,
        );
    }
    @Delete(':customerId')
remove(
  @Param('businessId', ParseIntPipe) businessId: number,
  @Param('customerId', ParseIntPipe) customerId: number,
) {
  return this.customersService.remove(
    businessId,
    customerId,
  );
}

}