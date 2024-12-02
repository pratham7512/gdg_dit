'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { uploadFileToFirebase } from '../../firebase/firebaseUtils';

export default function AddTeamMembers() {
  const router = useRouter();
  const [newTeamMembers, setNewTeamMembers] = useState([createEmptyMember()]);

  function createEmptyMember() {
    return {
      name: '',
      role: '',
      image: '',
      domain: '',
      bio: '',
      socialLinks: {
        linkedin: '',
        github: '',
        twitter: ''
      }
    };
  }

  const handleImageUpload = async (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = await uploadFileToFirebase(file, "team-members");
      updateMember(index, 'image', imageUrl);
    }
  };

  const updateMember = (index, field, value) => {
    setNewTeamMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      if (field.includes('.')) {
        const [parentField, childField] = field.split('.');
        updatedMembers[index] = {
          ...updatedMembers[index],
          [parentField]: {
            ...updatedMembers[index][parentField],
            [childField]: value
          }
        };
      } else {
        updatedMembers[index] = { ...updatedMembers[index], [field]: value };
      }
      return updatedMembers;
    });
  };

  const addTeamMember = () => setNewTeamMembers([...newTeamMembers, createEmptyMember()]);
  const removeTeamMember = () => setNewTeamMembers(newTeamMembers.slice(0, -1));

  const addTeamMembersToDatabase = async () => {
    const response = await fetch('/api/team-members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTeamMembers),
    });

    if (response.ok) {
      router.push('/ditgdgadmin/dashboard');
    } else {
      console.error('Failed to add team members');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTeamMembersToDatabase();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add Team Members</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Team Members
              <div>
                <Button size="sm" onClick={addTeamMember}><Plus className="h-4 w-4" /></Button>
                <Button
                  size="sm"
                  onClick={removeTeamMember}
                  className="ml-2"
                  disabled={newTeamMembers.length <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {newTeamMembers.map((member, index) => (
              <Card key={index} className="border">
                <CardHeader>
                  <CardTitle>Member {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`name-${index}`}>Name</Label>
                      <Input
                        id={`name-${index}`}
                        value={member.name}
                        onChange={(e) => updateMember(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`role-${index}`}>Role</Label>
                      <Input
                        id={`role-${index}`}
                        value={member.role}
                        onChange={(e) => updateMember(index, 'role', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`domain-${index}`}>Domain</Label>
                    <Input
                      id={`domain-${index}`}
                      value={member.domain}
                      onChange={(e) => updateMember(index, 'domain', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`bio-${index}`}>Bio</Label>
                    <Textarea
                      id={`bio-${index}`}
                      value={member.bio}
                      onChange={(e) => updateMember(index, 'bio', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`image-${index}`}>Profile Image</Label>
                    <Input
                      type="file"
                      id={`image-${index}`}
                      onChange={(e) => handleImageUpload(index, e)}
                    />
                    {member.image && (
                      <img
                        src={member.image}
                        alt={`Member ${index + 1}`}
                        className="w-32 h-32 object-cover mt-2"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Social Links</Label>
                    <Input
                      placeholder="LinkedIn"
                      value={member.socialLinks.linkedin}
                      onChange={(e) => updateMember(index, 'socialLinks.linkedin', e.target.value)}
                    />
                    <Input
                      placeholder="GitHub"
                      value={member.socialLinks.github}
                      onChange={(e) => updateMember(index, 'socialLinks.github', e.target.value)}
                    />
                    <Input
                      placeholder="Twitter"
                      value={member.socialLinks.twitter}
                      onChange={(e) => updateMember(index, 'socialLinks.twitter', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
        <Button type="submit" className="w-full">Add Team Members</Button>
      </form>
    </div>
  );
}
