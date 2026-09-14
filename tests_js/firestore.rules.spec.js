"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var rules_unit_testing_1 = require("@firebase/rules-unit-testing");
var fs = __importStar(require("fs"));
var testEnv;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, rules_unit_testing_1.initializeTestEnvironment)({
                    projectId: 'demo-sanatanibandhan',
                    firestore: {
                        rules: fs.readFileSync('firestore.rules', 'utf8'),
                        host: '127.0.0.1',
                        port: 8080,
                    },
                })];
            case 1:
                testEnv = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, testEnv.clearFirestore()];
            case 1:
                _a.sent();
                return [4 /*yield*/, testEnv.withSecurityRulesDisabled(function (context) { return __awaiter(void 0, void 0, void 0, function () {
                        var db;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    db = context.firestore();
                                    return [4 /*yield*/, db.collection('platform_admins').doc('global-admin-uid').set({ active: true })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, db.collection('workspaces').doc('ws-1').set({ name: 'Workspace 1' })];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, db.collection('workspaces').doc('ws-2').set({ name: 'Workspace 2' })];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, db.collection('users').doc('admin-1').set({ workspaceId: 'ws-1', role: 'SUPER_ADMIN' })];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, db.collection('users').doc('user-1').set({ workspaceId: 'ws-1', role: 'DEVOTEE' })];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, db.collection('users').doc('user-2').set({ workspaceId: 'ws-2', role: 'DEVOTEE' })];
                                case 6:
                                    _a.sent();
                                    return [4 /*yield*/, db.collection('devotees').doc('dev-1').set({ workspaceId: 'ws-1', name: 'Devotee 1' })];
                                case 7:
                                    _a.sent();
                                    return [4 /*yield*/, db.collection('devotees').doc('dev-2').set({ workspaceId: 'ws-2', name: 'Devotee 2' })];
                                case 8:
                                    _a.sent();
                                    return [4 /*yield*/, db.collection('treasury').doc('tr-1').set({ workspaceId: 'ws-1', amount: 100 })];
                                case 9:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, testEnv.cleanup()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('Firestore Security Rules', function () {
    it('1. Anonymous user cannot read protected tenant data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var unauthedDb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    unauthedDb = testEnv.unauthenticatedContext().firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(unauthedDb.collection('devotees').get())];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('2. Workspace A user cannot read Workspace B devotees', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1Db, query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1Db = testEnv.authenticatedContext('user-1').firestore();
                    query = user1Db.collection('devotees').where('workspaceId', '==', 'ws-2');
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(query.get())];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('3. Workspace A user cannot write Workspace B data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1Db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1Db = testEnv.authenticatedContext('user-1').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(user1Db.collection('devotees').add({ workspaceId: 'ws-2', name: 'Hack' }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('4. User cannot change their own role', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1Db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1Db = testEnv.authenticatedContext('user-1').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(user1Db.collection('users').doc('user-1').update({ role: 'SUPER_ADMIN' }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('5. User cannot change their own workspace membership', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1Db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1Db = testEnv.authenticatedContext('user-1').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(user1Db.collection('users').doc('user-1').update({ workspaceId: 'ws-2' }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('6. Unauthorized user cannot create treasury records', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1Db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1Db = testEnv.authenticatedContext('user-1').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(user1Db.collection('treasury').add({ workspaceId: 'ws-1', amount: 500 }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('7. Unauthorized user cannot modify treasury records', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1Db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1Db = testEnv.authenticatedContext('user-1').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(user1Db.collection('treasury').doc('tr-1').update({ amount: 9999 }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('8. Non-participant cannot read a private chat', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user2Db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testEnv.withSecurityRulesDisabled(function (context) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, context.firestore().collection('chats').doc('admin-1_user-1').collection('messages').add({ text: 'Hello' })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    _a.sent();
                    user2Db = testEnv.authenticatedContext('user-2').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(user2Db.collection('chats').doc('admin-1_user-1').collection('messages').get())];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('9. Non-authorized user cannot modify protected chat data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user2Db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user2Db = testEnv.authenticatedContext('user-2').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(user2Db.collection('chats').doc('admin-1_user-1').set({ text: 'Hack' }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('10. Cross-workspace community access is denied', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1Db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1Db = testEnv.authenticatedContext('user-1').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(user1Db.collection('communities').doc('ws-2').collection('social_feed').get())];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('11. Ordinary user cannot modify audit records', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1Db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testEnv.withSecurityRulesDisabled(function (context) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, context.firestore().collection('audit_logs').doc('audit-1').set({ workspaceId: 'ws-1', action: 'test' })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    _a.sent();
                    user1Db = testEnv.authenticatedContext('user-1').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(user1Db.collection('audit_logs').doc('audit-1').update({ action: 'hacked' }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('12. Ordinary user cannot delete audit records', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1Db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1Db = testEnv.authenticatedContext('user-1').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(user1Db.collection('audit_logs').doc('audit-1').delete())];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('13. User cannot change protected admin flags', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1Db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1Db = testEnv.authenticatedContext('user-1').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(user1Db.collection('users').doc('user-1').update({ admin: true }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('14. User cannot impersonate another user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1Db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1Db = testEnv.authenticatedContext('user-1').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(user1Db.collection('users').doc('user-2').set({ role: 'DEVOTEE' }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('15. Authorized workspace administrator succeeds', function () { return __awaiter(void 0, void 0, void 0, function () {
        var adminDb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adminDb = testEnv.authenticatedContext('admin-1').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertSucceeds)(adminDb.collection('treasury').add({ workspaceId: 'ws-1', amount: 1000 }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('16. Authorized global administrator succeeds where intended', function () { return __awaiter(void 0, void 0, void 0, function () {
        var globalAdminDb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    globalAdminDb = testEnv.authenticatedContext('global-admin-uid').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertSucceeds)(globalAdminDb.collection('devotees').doc('dev-2').update({ name: 'Updated' }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('17. Participant cannot arbitrarily change participants', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1Db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testEnv.withSecurityRulesDisabled(function (context) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, context.firestore().collection('chats').doc('chat_test_1').set({ participants: ['user-1', 'user-2'] })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    _a.sent();
                    user1Db = testEnv.authenticatedContext('user-1').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(user1Db.collection('chats').doc('chat_test_1').update({ participants: ['user-1', 'hacker'] }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('18. SenderId cannot be forged in chat messages', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1Db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testEnv.withSecurityRulesDisabled(function (context) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, context.firestore().collection('chats').doc('chat_test_2').set({ participants: ['user-1', 'user-2'] })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    _a.sent();
                    user1Db = testEnv.authenticatedContext('user-1').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(user1Db.collection('chats').doc('chat_test_2').collection('messages').add({ senderId: 'user-2', text: 'Forgery' }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('19. DEMO workspace user cannot access production tenant data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var demoAdminDb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testEnv.withSecurityRulesDisabled(function (context) { return __awaiter(void 0, void 0, void 0, function () {
                        var db;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    db = context.firestore();
                                    return [4 /*yield*/, db.collection('users').doc('demo-super-admin').set({ workspaceId: 'DEMO_123', role: 'SUPER_ADMIN' })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, db.collection('devotees').doc('prod-devotee').set({ workspaceId: 'ws-1', name: 'Prod Devotee' })];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    _a.sent();
                    demoAdminDb = testEnv.authenticatedContext('demo-super-admin').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(demoAdminDb.collection('devotees').doc('prod-devotee').get())];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('20. DEMO user cannot create or modify platform_admins', function () { return __awaiter(void 0, void 0, void 0, function () {
        var demoDb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testEnv.withSecurityRulesDisabled(function (context) { return __awaiter(void 0, void 0, void 0, function () {
                        var db;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    db = context.firestore();
                                    return [4 /*yield*/, db.collection('users').doc('demo-user').set({ workspaceId: 'DEMO_123', role: 'SUPER_ADMIN' })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, db.collection('platform_admins').doc('admin-record').set({ active: true })];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    _a.sent();
                    demoDb = testEnv.authenticatedContext('demo-user').firestore();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(demoDb.collection('platform_admins').doc('demo-user').set({ active: true }))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, rules_unit_testing_1.assertFails)(demoDb.collection('platform_admins').doc('admin-record').update({ active: false }))];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
