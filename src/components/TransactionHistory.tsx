import React, { useEffect, useState } from 'react';
import { Download, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { toast } from 'react-hot-toast';

interface StudentDetails {
  first_name: string;
  last_name: string;
  student_class: string;
}

interface Transaction {
  id: string;
  fee_type: string;
  amount: string;
  payment_date: string;
  receipt_number: string;
  payment_method: string;
  student_details: StudentDetails;
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Fetch payment transactions from API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/payment/')
      .then((res) => res.json())
      .then((data) => {
        const result = data.results || data;
        setTransactions(result);
      })
      .catch(() => toast.error('Failed to load transactions'));
  }, []);

  // ✅ Search filter
  const filtered = transactions.filter(
    (t) =>
      `${t.student_details.first_name} ${t.student_details.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      t.receipt_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 text-2xl font-semibold mb-1">Transaction History</h1>
          <p className="text-gray-600">View all fee payment transactions</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Search Filter */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by student name or receipt..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Transactions ({filtered.length})</CardTitle>
            <div className="text-sm text-gray-600">
              Total: <span className="text-gray-900 font-semibold">
                ₹{filtered.reduce((sum, t) => sum + parseFloat(t.amount), 0).toFixed(2)}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Receipt No.</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Fee Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.length > 0 ? (
                  filtered.map((t) => (
                    <TableRow key={t.id} className="hover:bg-gray-50 transition">
                      <TableCell className="text-gray-700">{t.payment_date}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{t.receipt_number}</code>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {t.student_details.first_name} {t.student_details.last_name}
                      </TableCell>
                      <TableCell className="text-gray-700">{t.student_details.student_class}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 capitalize">
                          {t.fee_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-gray-900">₹{t.amount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 capitalize">
                          {t.payment_method}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
