import React from 'react';
import Card from '../base/Card';
import { Product } from '../../types';
import { DollarSign, Calendar, Percent } from 'lucide-react';

interface EquipmentFinancingProps {
  products: Product[];
}

const EquipmentFinancing: React.FC<EquipmentFinancingProps> = ({ products }) => {
  const constructionEquipment = products.filter(product => product.image && product.financing);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Equipment Financing</h2>
        <p className="text-gray-600">Flexible financing options for construction equipment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {constructionEquipment.map((equipment) => (
          <Card key={equipment.id} className="overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={equipment.image}
                alt={equipment.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {equipment.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {equipment.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Equipment Price</span>
                  <span className="text-lg font-semibold text-gray-900">
                    ${equipment.price?.toLocaleString()}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Financing Options
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        Term
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {equipment.financing?.term}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Percent className="w-4 h-4 mr-1" />
                        Rate
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {equipment.financing?.rate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        Monthly Payment
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        ${equipment.financing?.monthlyPayment.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EquipmentFinancing; 