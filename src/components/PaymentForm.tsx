import React, { useEffect, useState } from 'react';
import { ArrowLeft, Save, CreditCard, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface PaymentFormProps {
  onNavigate: (page: string) => void;
}

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  roll_number: string;
  student_class: string; // like "9"
  section: string;
}

interface ClassItem {
  id: string;
  name: string; // like "Class 9-A"
  grade: string; // like "9"
  section: string;
  teacher: {
    first_name: string;
    last_name: string;
  };
}

export default function PaymentForm({ onNavigate }: PaymentFormProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [uniqueGrades, setUniqueGrades] = useState<string[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>(''); // this stores grade only
  const [feeType, setFeeType] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [paymentDate, setPaymentDate] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [transactionId, setTransactionId] = useState<string>('');
  const [bankRef, setBankRef] = useState<string>('');
  const [otherFeeName, setOtherFeeName] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [openStudentPopover, setOpenStudentPopover] = useState(false);

  // ✅ Fetch all students
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/student/')
      .then((res) => res.json())
      .then((data) => setStudents(data.results || data))
      .catch(() => toast.error('Failed to load students'));
  }, []);

  // ✅ Fetch all classes
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/class/')
      .then((res) => res.json())
      .then((data) => {
        const classData = data.results || data;
        setClasses(classData);

        // Get unique grade list (9, 10, 11, etc.)
        const unique = Array.from(
          new Set(classData.map((c: ClassItem) => String(c.grade)))
        );
        setUniqueGrades(unique as string[]);


      })
      .catch(() => toast.error('Failed to load classes'));
  }, []);

  // ✅ Filter students based on selected class grade
  useEffect(() => {
    if (selectedClass) {
      const filtered = students.filter(
        (s) => String(s.student_class) === String(selectedClass)
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
    setSelectedStudent('');
  }, [selectedClass, students]);

  // ✅ Submit payment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !feeType || !amount || !paymentDate) {
      toast.error('Please fill all required fields');
      return;
    }

    // When fee type is Other, require the other fee name
    if (feeType === 'other' && !otherFeeName.trim()) {
      toast.error('Please provide the fee name for Other fee type');
      return;
    }

    const payload = {
      student: selectedStudent,
      fee_type: feeType,
      other_fee_name: feeType === 'other' ? otherFeeName : null,
      amount: amount,
      payment_date: paymentDate,
      payment_method: paymentMethod,
      transaction_id: transactionId || null,
      bank_reference: bankRef || null,
      remarks: remarks || null,
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/payment/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success('Payment recorded successfully!');
        setTimeout(() => onNavigate('fees'), 1500);
      } else {
        const err = await res.json();
        toast.error(`Failed: ${JSON.stringify(err)}`);
      }
    } catch {
      toast.error('Something went wrong while recording payment.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate('fees')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-gray-900 mb-2">Add Payment</h1>
          <p className="text-gray-600">Record a new fee payment</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Student Info */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Class Select */}
              <div className="space-y-2">
                <Label htmlFor="class">Select Class *</Label>
                <Select onValueChange={(value: string) => setSelectedClass(value)}>
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueGrades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Student Search Select */}
              <div className="space-y-2">
                <Label htmlFor="student">Select Student *</Label>
                <Popover open={openStudentPopover} onOpenChange={setOpenStudentPopover}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {selectedStudent
                        ? `${filteredStudents.find((s) => String(s.id) === String(selectedStudent))?.first_name || ''} ${filteredStudents.find((s) => String(s.id) === String(selectedStudent))?.last_name || ''}`
                        : 'Search Student'}
                      <Search className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search by name or roll no..." />
                      <CommandEmpty>No student found.</CommandEmpty>
                      <CommandGroup>
                        {filteredStudents.map((student) => (
                          <CommandItem
                            key={student.id}
                            onSelect={() => {
                              setSelectedStudent(String(student.id));
                              setOpenStudentPopover(false);
                            }}
                          >
                            {student.first_name} {student.last_name} — {student.roll_number}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Info */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Fee Type & Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="feeType">Fee Type *</Label>
                <Select onValueChange={(value: string) => setFeeType(value)}>
                  <SelectTrigger id="feeType">
                    <SelectValue placeholder="Select Fee Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tuition">Tuition Fee</SelectItem>
                    <SelectItem value="exam">Exam Fee</SelectItem>
                    <SelectItem value="transport">Transport Fee</SelectItem>
                    <SelectItem value="library">Library Fee</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Other Fee Name when fee type is Other */}
            {feeType === 'other' && (
              <div className="space-y-2">
                <Label htmlFor="otherFeeName">Other Fee Name *</Label>
                <Input
                  id="otherFeeName"
                  value={otherFeeName}
                  onChange={(e) => setOtherFeeName(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Payment Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Payment Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label>Payment Method *</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value: string) => setPaymentMethod(value)}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <RadioOption id="cash" value="cash" label="Cash" />
                  <RadioOption id="card" value="card" label="Card" />
                  <RadioOption id="bank" value="bank" label="Bank Transfer" />
                </div>
              </RadioGroup>
            </div>

            {/* Conditional Inputs */}
            {paymentMethod === 'card' && (
              <div className="space-y-2">
                <Label htmlFor="transactionId">Transaction ID</Label>
                <Input
                  id="transactionId"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </div>
            )}
            {paymentMethod === 'bank' && (
              <div className="space-y-2">
                <Label htmlFor="bankRef">Bank Reference Number</Label>
                <Input
                  id="bankRef"
                  value={bankRef}
                  onChange={(e) => setBankRef(e.target.value)}
                />
              </div>
            )}

            {/* Remarks */}
            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks (Optional)</Label>
              <Textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Additional notes..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => onNavigate('fees')}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Payment
          </Button>
        </div>
      </form>
    </div>
  );
}

function RadioOption({ id, value, label }: { id: string; value: string; label: string }) {
  return (
    <div className="flex items-center space-x-2 border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
      <RadioGroupItem value={value} id={id} />
      <Label htmlFor={id} className="cursor-pointer flex-1">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          <span>{label}</span>
        </div>
      </Label>
    </div>
  );
}
