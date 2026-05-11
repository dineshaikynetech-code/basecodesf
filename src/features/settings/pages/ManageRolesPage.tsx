import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table';
import { Input } from '@/shared/components/ui/input';
import { ArrowLeft, Pencil, Trash2, Check, X } from 'lucide-react';
import { SettingsLayout } from '../components/SettingsLayout';
import { LocalBusinessPageWrapper } from '@/shared/layouts/LocalBusinessPageWrapper';
import { cn } from "@/shared/lib/utils";
import { ResponsiveTooltipText } from '@/shared/components/ui/responsive-toottip';

interface Permission {
    id: string;
    label: string;
}

interface Role {
    id: string;
    name: string;
    isDefault: boolean;
    permissions: Record<string, boolean>;
}

const permissions: Permission[] = [
    { id: 'schedulePost', label: 'Schedule Post' },
    { id: 'directPost', label: 'Direct Post' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'postIdeas', label: 'Post Ideas' },
    { id: 'publishedPost', label: 'Published Post' },
    { id: 'manageSocialChannel', label: 'Manage Social Channel' },
    { id: 'manageFeed', label: 'Manage Feed' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'integration', label: 'Integration' },
    { id: 'manageTeam', label: 'Manage Team' },
    { id: 'postApproval', label: 'Post Approval' },
    { id: 'location', label: 'Location' },
];

const ManageRoles: React.FC = () => {
    const navigate = useNavigate();

    const [roles, setRoles] = useState<Role[]>([
        { id: '1', name: 'Super Admin', isDefault: true, permissions: Object.fromEntries(permissions.map(p => [p.id, true])) },
        { id: '2', name: 'Admin', isDefault: true, permissions: Object.fromEntries(permissions.map(p => [p.id, true])) },
        { id: '3', name: 'Approver', isDefault: true, permissions: { schedulePost: true, directPost: true, analytics: true, postIdeas: true, publishedPost: true, manageSocialChannel: false, manageFeed: true, calendar: true, integration: true, manageTeam: false, postApproval: true, location: false } },
        { id: '4', name: 'Limited User', isDefault: true, permissions: { schedulePost: false, directPost: false, analytics: false, postIdeas: true, publishedPost: false, manageSocialChannel: false, manageFeed: false, calendar: false, integration: false, manageTeam: false, postApproval: false, location: false } },
    ]);

    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
    const [tempRoleName, setTempRoleName] = useState('');
    const [tempPermissions, setTempPermissions] = useState<Record<string, boolean>>({});

    const startAdding = () => {
        setTempRoleName('');
        setTempPermissions(Object.fromEntries(permissions.map(p => [p.id, false])));
        setIsAddingNew(true);
    };

    const handleSaveNewRole = () => {
        if (!tempRoleName.trim()) return;
        try {
            const newRole: Role = {
                id: Date.now().toString(),
                name: tempRoleName.trim(),
                isDefault: false,
                permissions: { ...tempPermissions },
            };
            setRoles(prev => [...prev, newRole]);
            setIsAddingNew(false);
        } catch (error) {
            console.error("Failed to add role:", error);
        }
    };

    const startEditing = (role: Role) => {
        setEditingRoleId(role.id);
        setTempRoleName(role.name);
        setTempPermissions({ ...role.permissions });
    };

    const handleUpdateRole = (roleId: string) => {
        setRoles(prev => prev.map(role =>
            role.id === roleId
                ? { ...role, name: tempRoleName, permissions: tempPermissions }
                : role
        ));
        setEditingRoleId(null);
    };

    const toggleTempPermission = (permId: string) => {
        setTempPermissions(prev => ({ ...prev, [permId]: !prev[permId] }));
    };

    const deleteRole = (id: string) => {
        if (window.confirm("Are you sure you want to delete this role?")) {
            setRoles(prev => prev.filter(role => role.id !== id));
        }
    };

    return (
        <SettingsLayout>
            <LocalBusinessPageWrapper>
                <Card className="border border-border shadow-none rounded-sm overflow-hidden bg-card py-0">
                    <div className="flex items-center justify-between p-3 border-b border-border">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => navigate('/settings')} className="h-8 w-8 text-foreground">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            <h2 className="text-base font-semibold text-foreground">Manage Role</h2>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => setIsAddingNew(true)}
                            className="rounded-md px-6 py-1 h-9 border-primary text-primary hover:bg-primary/5 font-medium transition-colors"
                        >
                            Add New Member
                        </Button>
                    </div>

                    <div className="w-full">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 hover:bg-muted/30 border-b">
                                    <TableHead className="font-semibold text-foreground  px-4 w-[180px]">Name</TableHead>
                                    {permissions.map(perm => (
                                        <TableHead key={perm.id} className="text-center font-semibold text-thead uppercase tracking-wider px-1">
                                            {perm.label}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {roles.map(role => {
                                    const isEditing = editingRoleId === role.id;
                                    return (
                                        <TableRow key={role.id} className="hover:bg-muted/50 border-b last:border-0">
                                            <TableCell className="font-medium px-4 py-3">
                                                <div className="flex items-center justify-between group">
                                                    {isEditing ? (
                                                        <Input
                                                            value={tempRoleName}
                                                            onChange={(e) => setTempRoleName(e.target.value)}
                                                            className="h-8 text-sm"
                                                        />
                                                    ) : (
                                                        <ResponsiveTooltipText
                                                            text={role.name}
                                                            className="text-gray-700"
                                                            breakpoints={{
                                                                base: 'max-w-[80px]', 
                                                                sm: 'max-w-[200px]',   // Mobile
                                                                md: 'max-w-[250px]',    // Tablet
                                                                lg: 'max-w-[300px]',
                                                                xl: 'max-w-[400px]'   // Desktop
                                                            }}
                                                        />
                                                    )}

                                                    {!role.isDefault && (
                                                        <div className="flex  items-center gap-1 ml-2">
                                                            {isEditing ? (
                                                                <Check className="w-4 h-4 text-emerald-600 cursor-pointer" onClick={() => handleUpdateRole(role.id)} />
                                                            ) : (
                                                                <>
                                                                    <Pencil className="w-3.5 h-3.5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" onClick={() => startEditing(role)} />
                                                                    <Trash2 className="w-3.5 h-3.5 text-destructive/70 cursor-pointer hover:text-destructive transition-colors" onClick={() => deleteRole(role.id)} />
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>

                                            {permissions.map(perm => (
                                                <TableCell key={perm.id} className="text-center px-1">
                                                    <Checkbox
                                                        checked={isEditing ? tempPermissions[perm.id] : role.permissions[perm.id]}
                                                        onCheckedChange={() => isEditing && toggleTempPermission(perm.id)}
                                                        className={cn(
                                                            "h-4 w-4 transition-all duration-200 justify-self-center",
                                                            "data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600",
                                                            (!isEditing) && "pointer-events-none opacity-100"
                                                        )}
                                                    />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}

                                {isAddingNew && (
                                    <TableRow className="bg-emerald-50/30">
                                        <TableCell className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    value={tempRoleName}
                                                    onChange={(e) => setTempRoleName(e.target.value)}
                                                    placeholder="Role Name"
                                                    className="h-8 text-sm"
                                                    autoFocus
                                                />
                                                <div className="flex gap-1">
                                                    <Check className="w-4 h-4 text-emerald-600 cursor-pointer" onClick={handleSaveNewRole} />
                                                    <X className="w-4 h-4 text-muted-foreground cursor-pointer" onClick={() => setIsAddingNew(false)} />
                                                </div>
                                            </div>
                                        </TableCell>
                                        {permissions.map(perm => (
                                            <TableCell key={perm.id} className="text-center px-1">
                                                <Checkbox
                                                    checked={tempPermissions[perm.id]}
                                                    onCheckedChange={() => toggleTempPermission(perm.id)}
                                                    className="h-4 w-4 data-[state=checked]:bg-emerald-600"
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </LocalBusinessPageWrapper>
        </SettingsLayout>
    );
};

export default ManageRoles;