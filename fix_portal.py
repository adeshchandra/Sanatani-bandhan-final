import re

filepath = 'src/components/domain3/PurohitMarketDesk.tsx'
with open(filepath, 'r') as f:
    text = f.read()

# I will replace the end of the file
end_old = """              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}"""

end_new = """              </form>
            )}
          </div>
        </div>, document.body
      )}
    </div>
  );
}"""

text = text.replace(end_old, end_new)

with open(filepath, 'w') as f:
    f.write(text)
