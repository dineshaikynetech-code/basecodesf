import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Label } from '@/shared/components/ui/label';
import { ArrowLeft, Pencil, Trash2, UserPlus } from 'lucide-react';
import { SettingsLayout } from '../components/SettingsLayout';
import { LocalBusinessPageWrapper } from '@/shared/layouts/LocalBusinessPageWrapper';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  createdBy: string;
  createdOn: string;
  status: 'Added' | 'Pending';
}

const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "aikynestorefries@yahoo.com",
    role: "Super Admin",
    createdBy: "rajkumar.d@yahoo.com",
    createdOn: "10-02-2026",
    status: "Added",
  },
  {
    id: 2,
    name: "ztravels@gmail.com",
    role: "Admin",
    createdBy: "aikynestorefries@yahoo.com",
    createdOn: "07-02-2026",
    status: "Added",
  },
  {
    id: 3,
    name: "danalab@gmail.com",
    role: "Limited User",
    createdBy: "ztravels@gmail.com",
    createdOn: "03-02-2026",
    status: "Pending",
  },
  {
    id: 4,
    name: "fashionpro@yahoo.com",
    role: "Approver",
    createdBy: "ztravels@gmail.com",
    createdOn: "25-01-2026",
    status: "Pending",
  },
];

const TeamMembers: React.FC = () => {
const navigate = useNavigate();
const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
const [newMemberEmail, setNewMemberEmail] = useState("");
const [newMemberRole, setNewMemberRole] = useState("Administrator");

 const handleAddMember = () => {
    if (newMemberEmail.trim()) {
      console.log("Adding new member:", { email: newMemberEmail, role: newMemberRole });
      // TODO: Integrate with API + Zustand later
      setIsAddDialogOpen(false);
      setNewMemberEmail("");
      alert("Member invitation sent successfully! (Demo)");
    }
  };
  const handleEdit = (id: number) => {
    console.log("Edit member:", id);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this team member?")) {
      console.log("Delete member:", id);
    }
  };

  return (
    <SettingsLayout>
      <LocalBusinessPageWrapper>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/settings')}
                className="h-9 w-9"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold">Team Members</h1>
            </div>

            <Button
              onClick={handleAddMember}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-md px-5 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Add New Member
            </Button>

          </div>

          {/* Table Card */}
          <Card className="rounded-sm border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold text-foreground">Name</TableHead>
                    <TableHead className="font-semibold text-foreground">Role</TableHead>
                    <TableHead className="font-semibold text-foreground">Created by</TableHead>
                    <TableHead className="font-semibold text-foreground">Created On</TableHead>
                    <TableHead className="font-semibold text-foreground">Status</TableHead>
                    <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {mockTeamMembers.map((member) => (
                    <TableRow key={member.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell className="text-muted-foreground">{member.createdBy}</TableCell>
                      <TableCell className="text-muted-foreground">{member.createdOn}</TableCell>
                      <TableCell>
                        <Badge
                          variant={member.status === 'Added' ? "default" : "secondary"}
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            member.status === 'Added'
                              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-rose-100 text-rose-700 hover:bg-rose-100'
                          }`}
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(member.id)}
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(member.id)}
                            className="h-8 w-8 text-muted-foreground hover:text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
        
      </LocalBusinessPageWrapper>
    </SettingsLayout>
  );
};

export default TeamMembers;