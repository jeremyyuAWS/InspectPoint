import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import Card from '../base/Card';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  views: number;
  helpful: number;
}

interface FAQVisualizationProps {
  faqs: FAQ[];
}

const FAQVisualization: React.FC<FAQVisualizationProps> = ({ faqs }) => {
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  const totalViews = faqs.reduce((sum, faq) => sum + faq.views, 0);
  const totalHelpful = faqs.reduce((sum, faq) => sum + faq.helpful, 0);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Knowledge Base</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <span className="font-medium">{category}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-semibold">{totalViews}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Helpful Responses</p>
              <p className="text-2xl font-semibold">{totalHelpful}</p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Top Questions</h4>
            <div className="space-y-2">
              {faqs
                .sort((a, b) => b.views - a.views)
                .slice(0, 3)
                .map((faq) => (
                  <div
                    key={faq.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <p className="font-medium">{faq.question}</p>
                    <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FAQVisualization; 