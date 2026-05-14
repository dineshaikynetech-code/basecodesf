import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { 
  Eye, 
  UserRound, 
  Star, 
  Heart, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

// Mock data based on the provided screenshot
const STATS_DATA = [
  { label: "Impressions", value: "39", icon: Eye, color: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-200" },
  { label: "Interactions", value: "26", icon: UserRound, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
  { label: "Rating", value: "5", icon: Star, color: "text-green-500", bg: "bg-green-50", border: "border-green-200" },
  { label: "Reviews", value: "11", icon: Heart, color: "text-red-500", bg: "bg-red-50", border: "border-red-200" },
];

const LOCATIONS = [
  {
    name: "Software Smart Training",
    address: "no.305, akshaya hq, chennai, Tamil Nadu - 603103",
    rating: 5,
    reviews: 9,
    interaction: 17,
    impression: 23,
    status: "verified"
  },
  {
    name: "Software Smart Training",
    address: "no.305, akshaya hq, chennai, Tamil Nadu - 603103",
    rating: 5,
    reviews: 9,
    interaction: 17,
    impression: 23,
    status: "verified"
  }
];

 const AddBusiness: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background p-4 md:p-8 space-y-6">
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <h1 className="text-xl font-bold text-foreground">Local Dashboard</h1>
        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-lg border border-border p-1">
            <Button variant="ghost" className="h-8 px-4 bg-green-700 text-white hover:bg-green-800 rounded-md">7 Days</Button>
            <Button variant="ghost" className="h-8 px-4 text-green-700 hover:bg-green-50">14 Days</Button>
            <Button variant="ghost" className="h-8 px-4 text-green-700 hover:bg-green-50">28 Days</Button>
          </div>
          <Button className="bg-primary text-primary-foreground font-semibold px-6">
            Add New Business
          </Button>
        </div>
      </header>

      {/* Stats Overview Grid */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {STATS_DATA.map((stat, index) => (
            <div key={index} className={`flex flex-col p-6 rounded-2xl border ${stat.border} ${stat.bg} space-y-4`}>
              <span className="text-sm font-medium text-gray-600">{stat.label}</span>
              <div className="flex items-center gap-4">
                <stat.icon className={`w-8 h-8 ${stat.color} fill-current`} />
                <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Filter Section */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 p-6">
          <div className="relative w-full md:max-w-md">
            <Input 
              placeholder="Search business or category..." 
              className="pl-4 pr-10 border-border h-11"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="text-blue-600 font-semibold text-sm hover:underline underline-offset-4">
              Reset Filters
            </button>
            <Button variant="outline" size="icon" className="border-border text-blue-500">
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Locations Table Section */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-6 text-foreground">Locations</h2>
          
          <div className="rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="border-border">
                  <TableHead className="font-bold text-gray-700 py-4">Location</TableHead>
                  <TableHead className="font-bold text-gray-700">Rating</TableHead>
                  <TableHead className="font-bold text-gray-700">Reviews</TableHead>
                  <TableHead className="font-bold text-gray-700">Interaction</TableHead>
                  <TableHead className="font-bold text-gray-700">Impression</TableHead>
                  <TableHead className="font-bold text-gray-700 text-right pr-12">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LOCATIONS.map((loc, i) => (
                  <TableRow key={i} className="border-border hover:bg-gray-50/30 transition-colors">
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground">{loc.name}</span>
                        <span className="text-xs text-muted-foreground mt-1">{loc.address}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-yellow-600">{loc.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 font-medium">{loc.reviews}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Eye className="w-4 h-4" />
                        <span className="font-medium">{loc.interaction}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Eye className="w-4 h-4" />
                        <span className="font-medium">{loc.impression}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <span className="bg-green-100 text-green-700 px-6 py-1 rounded-full text-xs font-bold">
                        {loc.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {/* Pagination Controls */}
            <div className="flex items-center justify-end p-4 bg-white border-t border-border gap-2">
              <Button variant="outline" size="icon" className="w-8 h-8 rounded border-border">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium">Page 1</span>
              <Button variant="outline" size="icon" className="w-8 h-8 rounded border-border">
                <ChevronRight className="w-4 h-4 text-green-600" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBusiness;