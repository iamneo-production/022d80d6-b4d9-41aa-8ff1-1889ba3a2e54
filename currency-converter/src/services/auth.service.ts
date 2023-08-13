class AuthService {
    private isAuthenticated: boolean = false;
    private token: string | null = null;
  
    constructor() {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        this.isAuthenticated = true;
        this.token = storedToken;
      }
    }
  
    login(username: string, password: string): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (username === 'user' && password === 'password') {
            this.isAuthenticated = true;
            this.token = 'your_generated_token_here'; 
            localStorage.setItem('authToken', this.token);
            resolve();
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      });
    }
  
    isAuthenticatedUser(): boolean {
      return this.isAuthenticated;
    }
  
    logout(): void {
      this.isAuthenticated = false;
      this.token = null;
      localStorage.removeItem('authToken');
    }
  
    getToken(): string | null {
      return this.token;
    }
  }
  
  const authService = new AuthService();
  export default authService;
  