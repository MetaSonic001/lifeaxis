
"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  Phone,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Clock,
  AlertTriangle,
  Heart,
  Car,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function EmergencyPage() {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",
    isPrimary: false,
  });

  useEffect(() => {
    // Initialize with sample emergency contacts
    const sampleContacts = [
      {
        id: 1,
        name: "Jane Smith",
        relationship: "Spouse",
        phone: "+1 (555) 987-6543",
        email: "jane.smith@email.com",
        address: "123 Main Street, Springfield, IL 62701",
        isPrimary: true,
      },
      {
        id: 2,
        name: "Robert Smith",
        relationship: "Father",
        phone: "+1 (555) 234-5678",
        email: "robert.smith@email.com",
        address: "456 Oak Avenue, Springfield, IL 62702",
        isPrimary: false,
      },
      {
        id: 3,
        name: "Dr. Sarah Johnson",
        relationship: "Primary Care Physician",
        phone: "+1 (555) 111-2222",
        email: "s.johnson@healthcenter.com",
        address: "Springfield Medical Center, 789 Health Blvd",
        isPrimary: false,
      },
    ];
    
    setEmergencyContacts(sampleContacts);
  }, []);

  const addContact = () => {
    const contact = {
      ...newContact,
      id: Date.now(),
    };
    
    setEmergencyContacts([...emergencyContacts, contact]);
    setNewContact({
      name: "",
      relationship: "",
      phone: "",
      email: "",
      address: "",
      isPrimary: false,
    });
    setShowAddDialog(false);
  };

  const deleteContact = (id) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
  };

  const setPrimaryContact = (id) => {
    setEmergencyContacts(contacts =>
      contacts.map(contact => ({
        ...contact,
        isPrimary: contact.id === id
      }))
    );
  };

  const callContact = (phone) => {
    // In a real app, this would initiate a phone call
    window.open(`tel:${phone}`);
  };

  const getRelationshipIcon = (relationship) => {
    const rel = relationship.toLowerCase();
    if (rel.includes("spouse") || rel.includes("husband") || rel.includes("wife")) {
      return <Heart className="w-5 h-5 text-red-500" />;
    } else if (rel.includes("doctor") || rel.includes("physician")) {
      return <Shield className="w-5 h-5 text-blue-500" />;
    } else if (rel.includes("parent") || rel.includes("father") || rel.includes("mother")) {
      return <User className="w-5 h-5 text-green-500" />;
    }
    return <User className="w-5 h-5 text-gray-500" />;
  };

  const emergencyServices = [
    {
      id: "911",
      name: "Emergency Services",
      description: "Police, Fire, Medical Emergency",
      phone: "911",
      available: "24/7",
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
    },
    {
      id: "poison",
      name: "Poison Control",
      description: "Poison Control Center",
      phone: "1-800-222-1222",
      available: "24/7",
      icon: <Shield className="w-6 h-6 text-orange-600" />,
    },
    {
      id: "mental",
      name: "Mental Health Crisis",
      description: "National Suicide Prevention Lifeline",
      phone: "988",
      available: "24/7",
      icon: <Heart className="w-6 h-6 text-purple-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="w-8 h-8 mr-3 text-red-600" />
            Emergency Contacts
          </h1>
          <p className="text-gray-600 mt-2">Manage your emergency contacts and important phone numbers</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Relationship</label>
                <Input
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  placeholder="Spouse, Parent, Friend, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  placeholder="john.doe@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  value={newContact.address}
                  onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
                  placeholder="123 Main St, City, State ZIP"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPrimary"
                  checked={newContact.isPrimary}
                  onChange={(e) => setNewContact({ ...newContact, isPrimary: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="isPrimary" className="text-sm font-medium">
                  Set as primary emergency contact
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={addContact}>Add Contact</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Emergency Services */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800">Emergency Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {emergencyServices.map((service) => (
              <div key={service.id} className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center space-x-3 mb-3">
                  {service.icon}
                  <div>
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.available}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => callContact(service.phone)}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    {service.phone}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personal Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Emergency Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyContacts.length === 0 ? (
              <div className="text-center py-8">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600">No emergency contacts</h3>
                <p className="text-gray-500">Add emergency contacts to ensure help is always available</p>
              </div>
            ) : (
              emergencyContacts.map((contact) => (
                <Card key={contact.id} className={`hover:shadow-md transition-shadow ${
                  contact.isPrimary ? "ring-2 ring-blue-200 bg-blue-50" : ""
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          {getRelationshipIcon(contact.relationship)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold">{contact.name}</h3>
                            {contact.isPrimary && (
                              <Badge className="bg-blue-100 text-blue-800">Primary</Badge>
                            )}
                          </div>
                          <p className="text-gray-600">{contact.relationship}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {contact.phone}
                            </div>
                            {contact.address && (
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {contact.address.split(",")[0]}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => callContact(contact.phone)}
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        {!contact.isPrimary && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setPrimaryContact(contact.id)}
                          >
                            Set Primary
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => deleteContact(contact.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Important Information */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-yellow-800">
            <p>• Always call 911 for life-threatening emergencies</p>
            <p>• Keep this information updated and accessible to family members</p>
            <p>• Consider sharing emergency contact information with your workplace</p>
            <p>• Make sure emergency contacts know about your medical conditions and medications</p>
            <p>• Keep a physical copy of emergency contacts in your wallet or purse</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
