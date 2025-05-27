
import React from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Child {
  code: string;
  name: string;
  ageGroup: string;
  nursery: string;
}

export function ChildrenList() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const children: Child[] = [
    {
      code: "CH001",
      name: "Emma J.",
      ageGroup: "3-4 years",
      nursery: "Al Badee Nursery"
    },
    {
      code: "CH002",
      name: "Oliver S.",
      ageGroup: "2-3 years",
      nursery: "Al Qulayaa Nursery"
    },
    {
      code: "CH003",
      name: "Sophia W.",
      ageGroup: "4-5 years",
      nursery: "Al Rahmaniya Nursery"
    }
  ];

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.nursery.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Children Information</CardTitle>
        <CardDescription>View essential child information for meal distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by code or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Age Group</TableHead>
              <TableHead>Nursery</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredChildren.map((child) => (
              <TableRow key={child.code}>
                <TableCell className="font-medium">{child.code}</TableCell>
                <TableCell>{child.name}</TableCell>
                <TableCell>{child.ageGroup}</TableCell>
                <TableCell>{child.nursery}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
